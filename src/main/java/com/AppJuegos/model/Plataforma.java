package com.AppJuegos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Plataforma {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idPlat;
    private String nombrePlataforma;
    private String version;

}
