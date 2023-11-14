package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.OrderInfo;
import com.repository.OrderInfoRepository;

@Service
public class OrderInfoService {

	@Autowired
	OrderInfoRepository orderInfoRepository;

	public List<OrderInfo> findOrders(String username) {
		return orderInfoRepository.findOrders(username);
	}
}
