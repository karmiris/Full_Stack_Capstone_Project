package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bean.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer>{

	// JPQL (Java Persistence Query language )
	@Query("select l from Login l where l.username = :username and l.password = :password")
	public Login signIn(@Param("username") String username, 
			@Param("password") String password);
	
	@Query("select l from Login l where l.username = :username")
	public Login findLogin(@Param("username") String username);
	
	@Modifying
	@Transactional
	@Query("update Login set password = :password where username = :username and isadmin = :isadmin")
	public int updatePass(@Param("username") String username, 
			@Param("password") String password, 
			@Param("isadmin") int isadmin);
	
}