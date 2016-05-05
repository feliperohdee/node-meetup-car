#include <VirtualWire.h>
#include <VirtualWire_Config.h>

void setup(){
  Serial.begin(9600);
  vw_set_tx_pin(8);
  vw_setup(2000);
  Serial.println("Ready");
}

void loop(){
  char data[1];
  int numero;
  if (Serial.available() > 0){
    Serial.readBytesUntil(13, data, 1);
    data[1] = 0;

    Serial.print("Sent : ");
    Serial.println(data);
    send(data);
  }  
} 

/**
 * emit data via RF
 * @param message
 */
void send (char *message){
  vw_send((uint8_t *)message, strlen(message));
  vw_wait_tx();
}
