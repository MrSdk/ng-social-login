import { Component, OnInit } from '@angular/core';
import { AppService } from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sonoch-io';
  users;

  constructor(private mySvc: AppService){ 
    // this.getUsers() 
    this.mySvc.getFireUsers().subscribe(result => {
      console.log(result);
      
    })
    // this.test()
    // this.mySvc.socket.emit('agree_or_refuse',{ driver_id: 5, customer_id: 302, agree: false })
    // this.mySvc.socket.on('agree_or_refuse_client',(data)=>{
    //   console.log(data);
      
    // })
  } 

  ngOnInit(){ 
     
    // setInterval(()=>{
    //   this.getUsers()
    //   window.location.reload()
    // },7000)
    
    this.mySvc.socket.on('driver_history',(data)=>{
      console.log(data);
      
    })
     
    this.mySvc.socket.on('onChange',(aaa)=>{
      alert(aaa);
      
    })
  }

  testSocket(){
    // this.mySvc.socket.emit('get_driver_history', { name: "Sdk" })
    this.mySvc.socket.emit('fromClient', { name: "Sdk" })
    
  }

  test(){
    this.testSocket();
  }

  getUsers(){
    this.mySvc.getUsers().subscribe((res)=>{
      var a = (res.json()).users;
      
      if( a.length != this.users.length && this.users.length != 0 ){
        alert("Added " + (this.users.length - a.length) + " users" )
      }

      this.users = a;
      
    })

  }
}
