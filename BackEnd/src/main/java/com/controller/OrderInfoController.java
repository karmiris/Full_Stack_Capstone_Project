package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bean.OrderInfo;
import com.service.OrderInfoService;
import com.service.OrderInfoService.toCartClass;

@RestController
@CrossOrigin
public class OrderInfoController {
	
	@Autowired
	OrderInfoService orderInfoService;

	// http://localhost:9090/findOrders/{uname}
	@RequestMapping(value = "findOrders/{uname}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<OrderInfo> findOrders (@PathVariable("uname") String username) {
		return orderInfoService.findOrders(username);
	}
	
	// http://localhost:9090/toCart/
	@PostMapping(value = "toCart", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String toCart (@RequestBody toCartClass newItem) {
		return orderInfoService.toCart(newItem.pid, newItem.uname);
	}
		
}
