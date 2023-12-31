package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.bean.Product;
import com.service.ProductService;
import com.service.ProductService.findProductClass;

@RestController
@CrossOrigin
public class ProductController {

	@Autowired
	ProductService productService; 

	// http://localhost:9090/allProducts
	@GetMapping(value = "allProducts", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Product> getAllProducts() {
		return productService.findAllProducts();
	}
	
	// http://localhost:9090/allProductsCustomer
	@GetMapping(value = "allProductsCustomer", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Product> allProductsCustomer() {
		return productService.findAllProductsCustomer();
	}
		
	// http://localhost:9090/findProduct/
	@PostMapping(value = "findProduct", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Product> findProduct (@RequestBody findProductClass fclass) {
		return productService.findProductList(fclass, "admin");
	}
	
	// http://localhost:9090/findProductCustomer/
	@PostMapping(value = "findProductCustomer", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Product> findProductCustomer (@RequestBody findProductClass fclass) {
		return productService.findProductList(fclass, "customer");
	}
		
	// http://localhost:9090/storeProduct/
	@PostMapping(value = "storeProduct", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String storeProduct (@RequestBody Product product) {
		return productService.storeProduct(product);
	}
	
	//http://localhost:9090/deleteProduct/1  // to delete product pid 1
	@DeleteMapping(value = "deleteProduct/{pid}")
	public String deleteProduct (@PathVariable("pid") int pid) {			
		return productService.deleteProduct(pid);
	}
	
	// http://localhost:9090/updateProduct
	@PostMapping(value = "updateProduct", consumes = MediaType.APPLICATION_JSON_VALUE)
	public int updateProduct (@RequestBody Product product) {
		return productService.updateProduct(product);
	}
	
}