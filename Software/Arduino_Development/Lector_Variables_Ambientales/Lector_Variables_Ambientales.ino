/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the Uno and
  Leonardo, it is attached to digital pin 13. If you're unsure what
  pin the on-board LED is connected to on your Arduino model, check
  the documentation at http://www.arduino.cc

  This example code is in the public domain.

  modified 8 May 2014
  by Scott Fitzgerald
 */


// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin 13 as an output.

  Serial.begin(9600);
  Serial.println("Iniciando");
}

// the loop function runs over and over again forever
void loop() {           // wait for a second

  int id = 1;
  float temp = 35.0;
  float hum = 40.0;
  Serial.print(id);
  Serial.print("#");
  Serial.print(temp);
  Serial.print("#");
  Serial.print(hum);

  delay(5000);
}
