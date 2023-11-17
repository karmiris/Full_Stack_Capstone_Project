package com.service;

import java.util.Iterator;
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
			newItem.setQuantity(1);
			orderInfoRepository.save(newItem);
			return "Product added in cart";
		}
		catch(Exception e) {
			return "Product not added: " + e.getMessage();
		}
	}
	
	public String removeCart(int oid) {		
		OrderInfo orderInfo = findOrderInfo(oid);
		if (orderInfo == null)
			return "Product not present in cart";
		try {			
			orderInfoRepository.delete(orderInfo);
			return "Product successfully removed from cart";
		}
		catch(Exception e) {
			return "Product removal from cart failed: " + e.getMessage();
		}		 
	}
	
	public OrderInfo findOrderInfo(int oid) {
		return orderInfoRepository.findOrderInfo(oid);
	}
	
	public String itemInc(int oid) {
		OrderInfo orderInfo = findOrderInfo(oid);
		if (orderInfo == null)
			return "Product not present in cart";
		try {			
			orderInfo.setQuantity(orderInfo.getQuantity()+1);
			orderInfoRepository.save(orderInfo);
			return ""; // no real message on success
		}
		catch(Exception e) {
			return "Product quantity increase failed: " + e.getMessage();
		}
	}
	
	public String itemDec(int oid) {
		OrderInfo orderInfo = findOrderInfo(oid);
		if (orderInfo == null)
			return "Product not present in cart";
		try {			
			if (orderInfo.getQuantity() > 1) {
				orderInfo.setQuantity(orderInfo.getQuantity()-1);
				orderInfoRepository.save(orderInfo);
			}
			return ""; // no real message on success
		}
		catch(Exception e) {
			return "Product quantity increase failed: " + e.getMessage();
		}
	}

	public String checkout(String uname) {
		List<OrderInfo> orderInfo = findOrders(uname);
		
		if (orderInfo.isEmpty())
			return "No items in cart";
		
		Iterator<OrderInfo> orderIterator = orderInfo.iterator();
		try {			
			while (orderIterator.hasNext())
				orderInfoRepository.delete(orderIterator.next());
			// Instead of just deleting the items here, we should do some proper payment management
			//	and store the info elsewhere so that the order would continue being processed
			return "Your order will be shipped soon!";
		}
		catch(Exception e) {
			return "Checkout failed: " + e.getMessage();
		}
	}

}