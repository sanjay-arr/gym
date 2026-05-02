package com.example.gym.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gym.Enditity.Customer;
import com.example.gym.Repository.CustomerRepository;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer addCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }
    
    public Customer getcustomerById(Long id){
        return customerRepository.findById(id).orElse(null);
    }

    public void deleteCustomer(Long id){
        customerRepository.deleteById(id);
    }

    public Customer updateCustomer(Long id,Customer newCusttomer){
        Customer old= customerRepository.findById(id).orElse(null);
        if(old!=null){
            old.setName(newCusttomer.getName());
            old.setEmail(newCusttomer.getEmail());
            old.setPhone(newCusttomer.getPhone());
            old.setGender(newCusttomer.getGender());

            return customerRepository.save(old);
        }
        return null;
    }
}

