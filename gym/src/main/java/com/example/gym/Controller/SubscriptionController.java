package com.example.gym.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gym.Enditity.Subscription;
import com.example.gym.Service.SubscriptionService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/subscription")
public class SubscriptionController {
    
    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping
    public Subscription savesub(@RequestBody Subscription sub){
        return subscriptionService.addSubscription(sub);
    }

    @GetMapping   
    public List<Subscription> getall(){
        return subscriptionService.getAllSubscriptions();
    }

    @GetMapping("/{id}")
    public Subscription getId(@PathVariable Long id){
        return subscriptionService.getSubscriptionById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        subscriptionService.deleteSubscription(id);
    }

    @PutMapping("/{id}")
    public Subscription update(@PathVariable Long id,@RequestBody Subscription sub){
        return subscriptionService.UpdateSubscription(id, sub);
    }
}

