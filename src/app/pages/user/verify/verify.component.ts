import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { registerResponse } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';
declare const particlesJS: any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  spinner: boolean = true;
  verify: boolean = false;
  notVerify: boolean = false;
  alreadyVerify: boolean = false;
  

  constructor(private route: ActivatedRoute,private userApiServiceService:UserApiServiceService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const token = this.route.snapshot.queryParamMap.get('token');

    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      const token = params.get('token');
      if(id !== null && token !== null){
        this.userApiServiceService.verifyRegistration(id,token).subscribe(({status,message}:registerResponse)=>{     
          if(message==="Already verified"){
            this.alreadyVerify=true
            this.spinner=false
          }else if( status){
            this.verify=true
            this.spinner=false
          }else{
            this.spinner=false
            this.verify=false
            this.notVerify=true
          }
        })
      }
      
    });


    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#0d47a1',
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#xxxxxx',
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 200,
          color: '#000000',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }


  


}