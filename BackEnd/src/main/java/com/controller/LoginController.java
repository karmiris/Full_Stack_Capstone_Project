package com.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bean.Login;
import com.service.LoginService;

@RestController
@CrossOrigin
public class LoginController {

	@Autowired
	LoginService loginService;
	
	// http://localhost:9090/allUsers
	@GetMapping(value = "allUsers", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Login> getAllUsers() {
		return loginService.findAllLogin();
	}
	
	// http://localhost:9090/signUp 
	@PostMapping(value = "signUp", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String signUp(@RequestBody Login login) {  // @RequestBody: gets json input from frontend
		return loginService.signUp(login);
	}
	
	// http://localhost:9090/signIn 
	@PostMapping(value = "signIn", consumes = MediaType.APPLICATION_JSON_VALUE)
	public int signIn(@RequestBody Login login) {
		return loginService.signIn(login);
	}
	
	// http://localhost:9090/updatePass
	@PostMapping(value = "updatePass", consumes = MediaType.APPLICATION_JSON_VALUE)
	public int updatePass(@RequestBody Login login) {
		return loginService.updatePass(login);
	}

	// http://localhost:9090/findUser/{uname}
	@RequestMapping(value = "findUser/{uname}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Login> findUsers (@PathVariable("uname") String username) {
		List<Login> result = new ArrayList<>();
		result.add(loginService.findLogin(username));
		return result;
	}
}