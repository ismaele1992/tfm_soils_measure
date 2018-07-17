
#define IDSENSOR1 1
#define IDSENSOR2 2
#define IDSENSOR3 3
#define IDSENSOR4 4
#define IDSENSOR5 5
#define IDSENSOR6 6
#define IDSENSOR7 7
#define IDSENSOR8 8
#define IDSENSOR9 9
#define IDSENSOR10 10
#define IDSENSOR11 11
#define IDSENSOR12 12
#define PINSENSOR1 A0
#define PINSENSOR2 A1
#define PINSENSOR3 A2
#define PINSENSOR4 A3
#define PINSENSOR5 A4
#define PINSENSOR6 A5
#define PINSENSOR7 A6
#define PINSENSOR8 A7
#define PINSENSOR9 A8
#define PINSENSOR10 A9
#define PINSENSOR11 A10
#define PINSENSOR12 A11

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(PINSENSOR1, INPUT);
  pinMode(PINSENSOR2, INPUT);
  pinMode(PINSENSOR3, INPUT);
  pinMode(PINSENSOR4, INPUT);
  pinMode(PINSENSOR5, INPUT);
  pinMode(PINSENSOR6, INPUT);
  pinMode(PINSENSOR7, INPUT);
  pinMode(PINSENSOR8, INPUT);
  pinMode(PINSENSOR9, INPUT);
  pinMode(PINSENSOR10, INPUT);
  pinMode(PINSENSOR11, INPUT);
  pinMode(PINSENSOR12, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:

  int humedad_sensor1 = analogRead(PINSENSOR1);
  int humedad_sensor2 = analogRead(PINSENSOR2);
  int humedad_sensor3 = analogRead(PINSENSOR3);
  int humedad_sensor4 = analogRead(PINSENSOR4);
  int humedad_sensor5 = analogRead(PINSENSOR5);
  int humedad_sensor6 = analogRead(PINSENSOR6);
  int humedad_sensor7 = analogRead(PINSENSOR7);
  int humedad_sensor8 = analogRead(PINSENSOR8);
  int humedad_sensor9 = analogRead(PINSENSOR9);
  int humedad_sensor10 = analogRead(PINSENSOR10);
  int humedad_sensor11 = analogRead(PINSENSOR11);
  int humedad_sensor12 = analogRead(PINSENSOR12);
  
  Serial.print(IDSENSOR1);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor1);
  Serial.print("#");

  Serial.print(IDSENSOR2);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor2);
  Serial.print("#");

  Serial.print(IDSENSOR3);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor3);
  Serial.print("#");

  Serial.print(IDSENSOR4);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor4);
  Serial.print("#");

Serial.print(IDSENSOR5);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor5);
  Serial.print("#");

  Serial.print(IDSENSOR6);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor6);
  Serial.print("#");

  Serial.print(IDSENSOR7);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor7);
  Serial.print("#");

  Serial.print(IDSENSOR8);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor8);
  Serial.print("#");

  Serial.print(IDSENSOR9);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor9);
  Serial.print("#");

  Serial.print(IDSENSOR10);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor10);
  Serial.print("#");

  Serial.print(IDSENSOR11);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor11);
  Serial.print("#");

  Serial.print(IDSENSOR12);
  Serial.print("#");
  Serial.print("0");
  Serial.print("#");
  Serial.print(humedad_sensor12);
  delay(15000);
}
