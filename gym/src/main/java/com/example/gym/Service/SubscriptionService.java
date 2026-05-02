package com.example.gym.Service;

import com.example.gym.Enditity.Subscription;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gym.Repository.SubscriptionRepository;

@Service
public class SubscriptionService {
    
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public Subscription addSubscription(Subscription sub){
        return subscriptionRepository.save(sub);
    }

    public List<Subscription> getAllSubscriptions(){
        return subscriptionRepository.findAll();
    }

    public Subscription getSubscriptionById(Long id){
        return subscriptionRepository.findById(id).orElse(null);
    }

    public void deleteSubscription(Long id){
        subscriptionRepository.deleteById(id);
    }

    public Subscription UpdateSubscription(Long id, Subscription sub){
        Subscription newsub1= subscriptionRepository.findById(id).orElse(null);

        if(newsub1!=null){
            newsub1.setPlanName(sub.getPlanName());
            newsub1.setStartdate(sub.getStartdate());
            newsub1.setEnddate(sub.getEnddate());

            return subscriptionRepository.save(newsub1);
        }
        return null;
    }
}
