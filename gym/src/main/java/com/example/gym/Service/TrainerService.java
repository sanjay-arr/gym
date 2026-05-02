package com.example.gym.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gym.Enditity.Trainer;
import com.example.gym.Repository.TrainerRepository;

@Service
public class TrainerService {
    
    @Autowired
    private TrainerRepository trainerRepository;

    public Trainer addTrainer(Trainer trainer){
        return trainerRepository.save(trainer);
    }

    public List<Trainer> getAllTrainers(){
        return trainerRepository.findAll();
    }

    public Trainer getTrainerById(Long id){
        return trainerRepository.findById(id).orElse(null);
    }

    public void deleteTrainer(Long id){
        trainerRepository.deleteById(id);
    }

    public Trainer updateTrainer(Long id,Trainer trainer){
        Trainer newt=trainerRepository.findById(id).orElse(null);

        if(newt!=null){
            newt.setAge(trainer.getAge());
            newt.setEmail(trainer.getEmail());
            newt.setGender(trainer.getGender());
            newt.setPhone(trainer.getPhone());
            newt.setName(trainer.getName());

            return trainerRepository.save(newt);
        }
        return null;
    }

}
