package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Product;
import com.repository.ProductRepository;
import com.bean.Category;
import com.repository.CategoryRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	public String storeProduct(Product product) {
		if (product.getPname() == null || product.getPname().length() == 0)
			return "Category name cannot be empty";
		Product result = findProductByName(product.getPname());
		if (result != null) 
			return "Product name already exists";
		System.out.println("product: " + product);
		try {
			Category category = categoryRepository.findCategoryByCid(product.getCategory().getCid());
		}
		catch(Exception e) {
			return "Non existing category: " + e.getMessage();
		}
		try {
			productRepository.save(product);
			return "Product details stored successfully";
		}
		catch(Exception e) {
			return "Product creation failed: " + e.getMessage();
		}
	}
	
	public String deleteProduct(int pid) {
		Product product = findProduct(pid);
		if (product == null)
			return "Product not present";
		//if (!product.getListOfProducts().isEmpty()) 
			//return "Delete products assigned to category first";
		try {			
			productRepository.delete(product);
			return "Product successfully removed";
		}
		catch(Exception e) {
			return "Product deletion failed: " + e.getMessage();
		}		 
	}
	
	public int updateProduct(Product product) {
		// empty product name
		if (product.getPname() == null || product.getPname().length() == 0) return 101;
		
		// negative price
		if (product.getPrice() <= 0) return 102;
				
		// name already exists
		Product test = findProductByName(product.getPname());
		if (test != null && test.getPid() != product.getPid()) return 103;
		
		// returns number of updated records (1: success, 0: failed)
		return productRepository.updateProduct(product.getPid(), product.getPname(), product.getPrice(), 
				product.getProductimage(), product.getCategory().getCid(), product.getIsEnabled());		
	}
	
	public List<Product> findAllProducts() {
		return productRepository.findAll();
	}
	
	public Product findProduct(int pid) {
		return productRepository.findProductByPid(pid);
	}
	
	public Product findProductByName(String pname) {
		return productRepository.findProductByName(pname);
	}
	
}