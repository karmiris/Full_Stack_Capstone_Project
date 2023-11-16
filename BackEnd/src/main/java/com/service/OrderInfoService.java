package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.OrderInfo;
import com.bean.Login;
import com.bean.Product;
import com.repository.OrderInfoRepository;
import com.repository.LoginRepository;
import com.repository.ProductRepository;

@Service
public class OrderInfoService {

	@Autowired
	OrderInfoRepository orderInfoRepository;
	@Autowired
	LoginRepository loginRepository;
	@Autowired
	ProductRepository productRepository;

	// used to transfer data for "toCart" operation
	public static class toCartClass {
		public int pid;
		public String uname;
	}
		
	public List<OrderInfo> findOrders(String username) {
		return orderInfoRepository.findOrders(username);
	}
	
	public String toCart(int pid, String uname) {
		Product product = productRepository.findProductByPid(pid);
		if (product == null) return "Product id does not exist";
		if (!product.getIsEnabled()) return "Cannot add inactive product in cart";
		
		Login login = loginRepository.findLogin(uname);
		if (login == null) return "Cannot add to cart of non existing user";
				
		try {
			OrderInfo newItem = new OrderInfo();
			newItem.setProduct(product);
			newItem.setUsername(login);
			orderInfoRepository.save(newItem);
			return "Product added in cart";
		}
		catch(Exception e) {
			return "Product not added: " + e.getMessage();
		}
	}
	
}
