package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Category;
import com.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public String storeCategory(String cname) {
		if (cname.length() == 0)
			return "Category name cannot be empty";
		Category result = findCategoryByName(cname);
		if (result != null) 
			return "Category already exists";
		try {
			Category category = new Category();
			category.setCategoryname(cname);
			categoryRepository.save(category);
			return "Category successfully created";
		}
		catch(Exception e) {
			return "Category creation failed: " + e.getMessage();
		}
	}
	
	public String deleteCategory(int cid) {
		Category category = findCategoryByCid(cid);
		if (category == null)
			return "Category not present";
		if (!category.getListOfProducts().isEmpty()) 
			return "Delete products assigned to category first";
		try {			
			categoryRepository.delete(category);
			return "Category successfully removed";
		}
		catch(Exception e) {
			return "Category deletion failed: " + e.getMessage();
		}		 
	}

	public int updateCategory(Category category) {
		// empty category name
		if (category.getCategoryname() == null || category.getCategoryname().length() == 0) return 101;
		
		// name already exists
		Category test = findCategoryByName(category.getCategoryname());
		if (test != null) return 102;
		
		// returns number of updated records (1: success, 0: failed)
		return categoryRepository.updateCategory(category.getCid(), category.getCategoryname());		
	}
	
	public List<Category> findAllCategory() {
		return categoryRepository.findAll();
	}
		
	public Category findCategoryByCid(int cid) {
		return categoryRepository.findCategoryByCid(cid);
	}
	
	public Category findCategoryByName(String categoryname) {
		return categoryRepository.findCategoryByName(categoryname);
	}
}
