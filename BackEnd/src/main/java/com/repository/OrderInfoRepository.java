package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bean.OrderInfo;

@Repository
public interface OrderInfoRepository extends JpaRepository<OrderInfo, Integer>{

	@Query("select o from OrderInfo o inner join o.username u where u.username = :username")
	public List<OrderInfo> findOrders(@Param("username") String username);
	
}
