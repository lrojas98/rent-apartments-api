import { Apartment } from "src/apartment/entities";
import { Client } from "src/client/entities";
import { CorporateTariff } from "src/corporate-tariff/entities";
import { Payment } from "src/payment/entities";
import { PropertyContent } from "src/property-content/entities";
import { Reservation } from "src/reservation/entities";
import { TouristTariff } from "src/tourist-tariff/entities";

export const entitiesMain = [
  Apartment,
  CorporateTariff,
  TouristTariff,
  Client,
  Reservation,
  Payment,
];

export const entitiesContent = [
  PropertyContent
];