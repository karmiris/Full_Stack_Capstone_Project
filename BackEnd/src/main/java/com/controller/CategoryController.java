package com.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.bean.Category;
import com.bean.Login;
import com.service.CategoryService;

@RestController
@CrossOrigin
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
	// http://localhost:9090/allCategories
	@GetMapping(value = "allCategories", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Category> getAllCategories() {
		return categoryService.findAllCategory();
	}

	// http://localhost:9090/findCategory/{cname}
	@RequestMapping(value = "findCategory/{cname}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Category> findCategory (@PathVariable("cname") String cname) {
		List<Category> result = new ArrayList<>();
		result.add(categoryService.findCategoryByName(cname));
		return result;
	}
		
	// http://localhost:9090/storeCategory
	@PostMapping(value = "storeCategory", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String storeCategory(@RequestBody Category category) {
		return categoryService.storeCategory(category);
	}
	
	//http://localhost:9090/deleteCategory/1  // to delete category cid 1
	@DeleteMapping(value = "deleteCategory/{cid}")
	public String deleteCategory(@PathVariable("cid") int cid) {			
		return categoryService.deleteCategory(cid);
	}
	
	/*
	@RequestMapping(value = "/adminHome",method = RequestMethod.GET)
	public String back(Model mm) {
		return "adminHome";
	}
		
	@RequestMapping(value = "/viewCategoryPage",method = RequestMethod.GET)
	public String viewCategory(Model mm, Category cc) {
		List<Category> listOfCategories = categoryService.findAllCategory();
		mm.addAttribute("category", cc);
		mm.addAttribute("categories", listOfCategories);
		return "manageCategory";
	}	
	
	@RequestMapping(value = "/storeCategoryInfo",method = RequestMethod.POST)
	public String storeAddCategoryPage(Model mm, Category cc) {
		String result = categoryService.storeCategory(cc);
		List<Category> listOfCategories = categoryService.findAllCategory();
		mm.addAttribute("category", cc);
		mm.addAttribute("msg", result);
		mm.addAttribute("categories", listOfCategories);
		return "manageCategory";
	}
	*/
}