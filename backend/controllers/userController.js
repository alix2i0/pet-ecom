const User = require("../models/User"); // Importing the User model
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { errorMonitor } = require("events");

// Controller function for user registration
exports.register = async (req, res) => {
  console.log('it get into the function ');
  try {
    const { username, email, password } = req.body; // Extracting username, email, and password from request body
    console.log("Attempting to register with username:", username, "email:", email, "password:", password);
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }); // Creating a new user
    res.status(201).json({ user }); // Sending response with the created user object
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handling errors
  }
};

// Controller function for user login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body; // Extracting username and password from request body
    const user = await User.findOne({ username }); // Finding the user by username
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" }); // Handling invalid username
    }
    const isValidPassword = await user.isValidPassword(password); // Validating password
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid username or password" }); // Handling invalid password
    }
    // Generating JWT token
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8,
    });

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };
    // Setting token in cookie and sending success response
    res.cookie("token", token, tokenOption).status(200).json({
      message: "Login successfully",
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handling errors
  }
};

// Controller function for ForgottenPassword

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json("User does not exist");
  }
  const resetToken = await user.createResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/passwordReset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.\n TOKEN : ${resetToken}\n
  http://localhost:5173/auth/reset-password/${resetToken} `;

  try {
    sendEmail({
      email: user.email,
      subject: "Password Change Request Received",
      message: message,
    });
    res.status(200).json({
      message:
        "A link to change your password has been sent to your registered Email" +
        user.email,
      status: "Success",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json("There was an issue with your email");
  }
};

exports.passwordReset = async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json("Token is invalid or has expired");
  }
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  //updating the new Password in database and removing tokens
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.passwordChangeAt = Date.now();
  //saving this information into database
  await user.save();
  //returning json response
  res.send({
    status: "success",
    message: `Your Password Has Been Changed Successfully!`,
  });
};

// Controller function for user logout
exports.logout = (req, res) => {
  try {
    // Clearing token cookie and sending success response
    res.clearCookie("token");
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({
      message: "Logged out Successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(400).json({ message: err.message }); // Handling errors
  }
};

// Controller function to get user profile
exports.getProfile = async (req, res) => {
  try {
    console.log("userId", req.userId);
    // Finding user by ID and sending user details in response
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      })
    }
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });

    console.log("user", user);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName,lastName,username, email, password, isAdmin } = req.body; 

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" }); // Handling missing fields
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("email", email, "password", password, "username", username, "firstName", firstName, "lastName", lastName, "isAdmin", isAdmin);

    const newUser = await User.create({ firstName,lastName,username, email, password: hashedPassword, isAdmin }); // Creating a new user
    res.status(201).json(newUser); // Sending response with the created user object
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handling errors
  }
};

// Controller function to get all users with pagination, limit, and search
exports.getAllUsers = async (req, res) => {
  try {
    let query = {};
    // Check if isAdmin query parameter exists
    const { isAdmin, search } = req.query;
    if (isAdmin) {
      query.isAdmin = isAdmin;
    }
    // Check if search query parameter exists
    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive search
      query.$or = [
        { username: searchRegex },
        { email: searchRegex },
        { firstName: searchRegex },
        { lastName: searchRegex },
      ];
    }
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1
    const limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10
    const skip = (page - 1) * limit; // Calculating the number of documents to skip

    let usersQuery = User.find(query).skip(skip).limit(limit); // Finding all users

    // Check if sorting query parameter exists
    const { sortBy } = req.query;
    const sortOptions = {};
    if (sortBy === "firstName" || sortBy === "lastName" || sortBy === "email" || sortBy === "username") {
      // Sorting by firstName, lastName, email, or username
      sortOptions[sortBy] = req.query.sortOrder === "desc" ? -1 : 1;
    } else if (sortBy === "isAdmin") {
      // Sorting by isAdmin
      sortOptions.isAdmin = req.query.sortOrder === "desc" ? -1 : 1;
    }

    const users = await usersQuery.sort(sortOptions).exec();
    const totalUsersCount = await User.countDocuments(query);

    // Calculating total pages
    const totalPages = Math.ceil(totalUsersCount / limit);

    res.json({
      users,
      currentPage: page,
      totalPages,
    }); // Sending response with all users
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handling errors
  }
};


exports.GetAllUsers = async (req,res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json(error)
  }
}

// Controller function to get a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Extracting user ID from request parameters
    const user = await User.findById(userId); // Finding user by ID
    if (!user) {
      res.status(404).json({ message: "User not found" }); // Handling user not found
    } else {
      res.json(user); // Sending response with the found user
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handling errors
  }
};

// Controller function to update a user's details
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Extracting user ID from request parameters
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }); // Updating user details
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" }); // Handling user not found
    } else {
      res.json(updatedUser); // Sending response with the updated user
    }
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handling errors
  }
};

// Controller function to delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Extracting user ID from request parameters
    const deletedUser = await User.findByIdAndDelete(userId); // Deleting user by ID
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" }); // Handling user not found
    } else {
      res.json({ message: "User deleted successfully" }); // Sending success response
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handling errors
  }
};

exports.CountUsers = async(req,res) => {
  const count=await User.countDocuments();
  res.json(count);
}
