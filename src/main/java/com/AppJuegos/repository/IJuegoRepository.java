package com.AppJuegos.repository;

import com.AppJuegos.model.Juego;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IJuegoRepository extends JpaRepository<Juego, Long> {
 
}
