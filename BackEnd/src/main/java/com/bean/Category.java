package com.bean;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cid;
	private String categoryname;
	
	@JsonBackReference
	@OneToMany (mappedBy = "category")
	private List<Product> listOfProducts;
	
	public int getCid() {
		return cid;
	}
	
	public void setCid(int cid) {
		this.cid = cid;
	}
	
	public String getCategoryname() {
		return categoryname;
	}
	
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	
	public List<Product> getListOfProducts() {
		return listOfProducts;
	}
	
	public void addProduct (Product product) {
		this.listOfProducts.add(product);
		product.setCategory(this);
	}
	
	@Override
	public String toString() {
		return "Category [cid=" + cid + ", categoryname=" + categoryname + ", listOfProducts=" + listOfProducts + "]";
	}

}