package com.example.gym.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gym.Enditity.Customer;
import com.example.gym.Service.CustomerService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/customer")
public class CustomerController {
    
    @Autowired
    private CustomerService customerService;

    @PostMapping
    public Customer add(@RequestBody Customer customer){
        return customerService.addCustomer(customer);
    }

    @GetMapping
    public List<Customer> getallcust(){
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getId(@PathVariable Long id){
        return customerService.getcustomerById(id);
    }
    
    @DeleteMapping("/{id}")
    public void deletecus(@PathVariable Long id){
        customerService.deleteCustomer(id);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id,@RequestBody Customer customer){
        return customerService.updateCustomer(id,customer);
    }

}

