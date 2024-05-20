import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProduct,
  setFilter,
  setSearch,
} from "../../../admin/src/services/reducer/productSlice";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedFilters,
  setSelectedFilters,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFilterChange = (filterKey, filterValue) => {
    const newFilters = { ...selectedFilters, [filterKey]: filterValue };
    setSelectedFilters(newFilters);
    dispatch(setFilter(newFilters));
    setCurrentPage(1);
    dispatch(
      fetchProduct({
        page: 1,
        search: searchTerm,
        filters: newFilters,
      })
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setSearch(e.target.value));
    dispatch(
      fetchProduct({
        page: 1,
        search: e.target.value,
        filters: selectedFilters,
      })
    );
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center justify-between mb-8 z-50">
      <div className="flex">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 border hover:border-amber-500 rounded-l-md shadow-sm sm:text-sm flex-grow"
        />
        <button
          onClick={() =>
            dispatch(
              fetchProduct({
                page: 1,
                search: searchTerm,
                filters: selectedFilters,
              })
            )
          }
          className="bg-amber-500 p-2 rounded-r-md flex items-center justify-center hover:bg-amber-600 cursor-pointer"
        >
          <FaSearch className="text-white" />
        </button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="shrink-0" variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] p-4">
          <div className="grid gap-4">
            <div>
              <Label className="text-sm font-medium" htmlFor="category">
                Category
              </Label>
              <Select
                defaultValue="all"
                id="category"
                onValueChange={(value) => handleFilterChange("category", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium" htmlFor="minPrice">
                  Min Price
                </Label>
                <Input
                  id="minPrice"
                  type="number"
                  value={selectedFilters.minPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-sm font-medium" htmlFor="maxPrice">
                  Max Price
                </Label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={selectedFilters.maxPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                />
              </div>
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() =>
                dispatch(
                  fetchProduct({
                    page: 1,
                    search: searchTerm,
                    filters: selectedFilters,
                  })
                )
              }
            >
              Apply Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filters;

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
