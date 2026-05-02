package com.example.gym.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gym.Enditity.Payment;
import com.example.gym.Repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment addPayment(Payment payment){
        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(Long id){
        return paymentRepository.findById(id).orElse(null);
    }
    
    public List<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }

    public void deletePayment(Long id){
        paymentRepository.deleteById(id);
    }

    public Payment updatePayment(Long id, Payment newPayment){
        Payment old = paymentRepository.findById(id).orElse(null);
        if(old!=null){
            old.setAmount(newPayment.getAmount());
            old.setPaymentMethod(newPayment.getPaymentMethod());
            old.setDate(newPayment.getDate());

            return paymentRepository.save(old);
        }
        return null;
    }
}

