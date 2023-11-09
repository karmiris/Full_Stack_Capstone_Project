package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bean.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

	@Query("select p from Product p where p.pid = :pid")
	public Product findProductByPid(@Param("pid") Integer pid);
	
	@Query("select p from Product p where p.pname = :name")
	public Product findProductByName(@Param("pname") String name);
	
	@Modifying
	@Transactional
	@Query("update Product set pname = :pname, price = :price, productimage = :pimage, category_cid = :cid where pid = :pid")
	public int updateProduct(@Param("pid") int pid, 
			@Param("pname") String pname,
			@Param("price") float price,
			@Param("pimage") String pimage,
			@Param("cid") int cid);
}
