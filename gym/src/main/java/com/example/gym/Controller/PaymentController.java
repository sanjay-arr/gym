package com.example.gym.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gym.Enditity.Payment;
import com.example.gym.Service.PaymentService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;


    @PostMapping
    public Payment savePayment(@RequestBody Payment payment){
        return paymentService.addPayment(payment);
    }

    @GetMapping
    public List<Payment> getpayment(){
        return paymentService.getAllPayments();
    }
    
    @GetMapping("/{id}")
    public Payment getId(@PathVariable Long id){
        return paymentService.getPaymentById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        paymentService.deletePayment(id);
    }

    @PutMapping("/{id}")
    public Payment update(@PathVariable Long id, @RequestBody Payment payment){
        return paymentService.updatePayment(id, payment);
    }

}
