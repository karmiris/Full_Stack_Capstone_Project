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
	
	public List<OrderInfo> findOrders(String username) {
		return orderInfoRepository.findOrders(username);
	}
	
	public String toCart(OrderInfo newItem) {
		Product product = productRepository.findProductByPid(newItem.getProduct().getPid());
		if (product == null) return "Product id does not exist";
		if (!product.getIsEnabled()) return "Cannot add inactive product in cart";
		
		Login login = loginRepository.findLogin(newItem.getUsername().getUsername());
		if (login == null) return "Cannot add to cart of non existing user";
				
		try {
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
