package com.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bean.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

	@Query("select c from Category c where c.cid = :cid")
	public Category findCategoryByCid(@Param("cid") int cid);
	
	@Query("select c from Category c where c.categoryname = :name")
	public Category findCategoryByName(@Param("name") String name);

}