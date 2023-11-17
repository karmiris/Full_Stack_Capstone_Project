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
	
	// used to transfer data for "findProductList" operation
	public static class findProductClass {
		public String pname;
		public boolean enName;
		public String opName;
		public float price;
		public boolean enPrice;
		public String opPrice;
		public String cid;		
	}
	
	public List<Product> findProductList(findProductClass fclass, String user) {
		List<Product> result = findAllProducts();
		
		if (fclass.enName) {
			switch (fclass.opName) {
				case "0": result.removeIf(product -> !product.getPname().equals(fclass.pname)); break;
				case "1": result.removeIf(product -> !product.getPname().contains(fclass.pname)); break;
			}
		}

		if (fclass.enPrice) {
			switch (fclass.opPrice) {
				case "0": result.removeIf(product -> product.getPrice() >= fclass.price); break;
				case "1": result.removeIf(product -> product.getPrice() > fclass.price); break;
				case "2": result.removeIf(product -> product.getPrice() != fclass.price); break;
				case "3": result.removeIf(product -> product.getPrice() < fclass.price); break;
				case "4": result.removeIf(product -> product.getPrice() <= fclass.price); break;
			}
		}
		
		if (Integer.parseInt(fclass.cid) != -1) {
			result.removeIf(product -> product.getCategory().getCid() != Integer.parseInt(fclass.cid));
		}
		
		if (user == "customer") {
			result.removeIf(product -> !product.getIsEnabled());
		}
		
		return result;
	}
	
	public String storeProduct(Product product) {
		if (product.getPname() == null || product.getPname().length() == 0)
			return "Category name cannot be empty";
		Product result = findProductByName(product.getPname());
		if (result != null) 
			return "Product name already exists";
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
	
	public List<Product> findAllProductsCustomer() {
		List<Product> result = findAllProducts();
		result.removeIf(product -> !product.getIsEnabled());
		return result;
	}
	
	public Product findProduct(int pid) {
		return productRepository.findProductByPid(pid);
	}
	
	public Product findProductByName(String pname) {
		return productRepository.findProductByName(pname);
	}
	
}