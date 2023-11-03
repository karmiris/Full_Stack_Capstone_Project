package com.controller;

import java.util.List;

import javax.servlet.http.HttpSession;
/*
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bean.Login;
import com.service.LoginService;

//@Controller
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
		//System.out.println(login); // call toString method
		return loginService.signUp(login);
	}
	
	// http://localhost:9090/signIn 
	@PostMapping(value = "signIn", consumes = MediaType.APPLICATION_JSON_VALUE)
	public int signIn(@RequestBody Login login) {
		return loginService.signIn(login);
	}
	
	// http://localhost:9090/updatePass 
	@PostMapping(value = "updatePass", consumes = MediaType.APPLICATION_JSON_VALUE)
	//public int updatePass(String username, String oldPass, int isAdm, String newPass) {
	public int updatePass(@RequestBody String request) {
		Login login = new Login();
		login.setUsername(username);
		login.setPassword(oldPass);
		login.setIsadmin(isAdm);
		return loginService.updatePass(login, newPass);
	}
		
	/*
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String open (Model mm, Login ll) {
		mm.addAttribute("login", ll);
		return "index";
	}
	
	@RequestMapping(value = "/openSignUp",method = RequestMethod.GET)
	public String openSignUpPage(Model mm, Login ll) {
		mm.addAttribute("login", ll);
		return "signUp";
	}
	
	@RequestMapping(value = "/signIn",method = RequestMethod.POST)
	public String signIn(Model mm, Login ll, HttpSession hs) {
		String result = loginService.signIn(ll);
		System.out.println(result);
		
		if (result.equals("Customer has successfully logged in!")) {
			hs.setAttribute("username", ll.getUsername());		// stored session object of that person 
			return "customerHome";
		}
		else if(result.equals("Admin has successfully logged in!")) 
			return "adminHome";
		else {
			mm.addAttribute("message", result);
			return "index";
		}
	}
	
	@RequestMapping(value = "/signUp",method = RequestMethod.POST)
	public String signUp(Model mm, Login ll) {
		String result = loginService.signUp(ll);
		mm.addAttribute("login", ll);
		System.out.println(result);
		return "index";
	}
	
	@RequestMapping(value = "/viewUsers",method = RequestMethod.GET)
	public String viewAllUsers (Model mm, Login ll) {
		List<Login> listOfUsers = loginService.findAllLogin();
		mm.addAttribute("users", listOfUsers);
		mm.addAttribute("msg", "All Users");
		mm.addAttribute("login", ll);
		return "viewUsersPage";
	}

	@RequestMapping(value = "/findUser",method = RequestMethod.POST)
	public String findUsers (Model mm, Login ll) {
		Login listOfUsers = loginService.findLogin(ll.getUsername());
		if (listOfUsers == null) {
			mm.addAttribute("msg", "User not found");
			mm.addAttribute("login", ll);
		}
		else {
			mm.addAttribute("msg", "User found!");
			mm.addAttribute("login", ll);
			mm.addAttribute("users", listOfUsers);
		}
		return "viewUsersPage";
	}
	 
	@RequestMapping(value = "/changePassPage",method = RequestMethod.GET)
	public String changePassPage (Model mm, Login ll) {
		mm.addAttribute("login", ll);
		return "changePass";
	}
	
	@RequestMapping(value = "/changePass",method = RequestMethod.POST)
	public String changePass (Model mm, Login ll) {
		ll.setUsername("admin");
		ll.setIsadmin(1);
		String result = loginService.updatePass(ll);
		mm.addAttribute("login", ll);
		mm.addAttribute("msg", result);
		return "changePass";
	}
	*/
}