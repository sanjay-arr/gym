package com.example.gym.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gym.Enditity.Trainer;
import com.example.gym.Service.TrainerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/trainer")
public class TrainerController {
    
    @Autowired  
    private TrainerService trainerService;

    @GetMapping
    public List<Trainer> getall(){
        return trainerService.getAllTrainers();
    }

    @GetMapping("/{id}")
    public Trainer getId(@PathVariable Long id){
        return trainerService.getTrainerById(id);
    }

    @PostMapping
    public Trainer savTrainer(@RequestBody Trainer trainer){
        return trainerService.addTrainer(trainer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        trainerService.deleteTrainer(id);
    }

    @PutMapping("/{id}")
    public Trainer Update(@PathVariable Long id, @RequestBody Trainer trainer){
        return trainerService.updateTrainer(id, trainer);
    }
    
}

