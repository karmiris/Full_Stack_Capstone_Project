package com.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Login;
import com.repository.LoginRepository;

@Service
public class LoginService {

	@Autowired
	LoginRepository loginRepository;
	
	public String signUp (Login login) {
		if (login.getIsadmin() == 1)
			return "No more Admin accounts can be created";
		else {
			Login result = findLogin(login.getUsername());
			if (result != null) 
				return "Username is already used";
			else {
				try {
					loginRepository.save(login);
					return "Account created successfully";
				}
				catch(Exception e) {
					return "Account creation failed: " + e.getMessage();
				}
			}
		}
	}
		
	public String signIn (Login login) {
		Login ll = loginRepository.signIn(login.getUsername(), login.getPassword());
		if (ll == null) 
			return "Invalid username or password";
		else {
			if (ll.getIsadmin() == 1)
				return "Admin has successfully logged in!";
			else 
				return "Customer has successfully logged in!";
		}
		
	}
	
	public List<Login> findAllLogin() {
		return loginRepository.findAll();
	}
	
	public Login findLogin(String username) {
		return loginRepository.findLogin(username);
	}
	
	public String updatePass(Login user) {
		int result = loginRepository.updatePass(user.getUsername(), user.getPassword(), user.getIsadmin());
		if (result == 1)
			return "Password Updated Successfully";
		else
			return "Password Update has Failed!";
	}
}