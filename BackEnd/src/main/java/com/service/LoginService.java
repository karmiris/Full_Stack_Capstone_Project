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
		if (login.getUsername().length() == 0)
			return "Username must not be empty";
		if (login.getPassword().length() == 0)
			return "Password must not be empty";
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
		
	public int signIn (Login login) {
		Login ll = loginRepository.signIn(login.getUsername(), login.getPassword());
		if (ll == null) 
			//return "Invalid username or password";
			return -1;
		else {
			if (ll.getIsadmin() == 1)
				//return "Admin has successfully logged in!";
				return 2;
			else 
				//return "Customer has successfully logged in!";
				return 1;
		}
		
	}
	
	public List<Login> findAllLogin() {
		return loginRepository.findAll();
	}
	
	public Login findLogin(String username) {
		return loginRepository.findLogin(username);
	}
	
	public int updatePass(Login user) {
		if (user.getPassword() == null || user.getPassword().length() == 0) return 101;
		
		// returns number of updated records (1: success, 0: failed)
		return loginRepository.updatePass(user.getUsername(), user.getPassword(), user.getIsadmin());		
	}
}