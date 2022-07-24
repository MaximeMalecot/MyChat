export const API = import.meta.env.VITE_API;

export const FRIEND_STATUS = {
    "CREATED": "CREATED",
    "AWAITING": "AWAITING",
    "ACCEPTED": "ACCEPTED",
    "REFUSED": "REFUSED",
    "DELETED": "DELETED"
}

export const SUB_FRIENDSHIP_TYPES = {
    "ACCEPTED" : "ACCEPTED",
    "RECEIVED": "RECEIVED",
}

export const NOTIFICATION_TYPES = {
    "MESSAGE": "MESSAGE",
    "FRIENDSHIP": "FRIENDSHIP",
}

export const REPORT_TYPES = {
    "SCAM": "SCAM",
    "CATFISH": "CATFISH",
    "HARASSMENT": "HARASSMENT",
    "UNAPROPRIAT_NAME": "UNAPROPRIAT_NAME",
    "THE_PICK": "THE_PICK",
    "OTHER": "OTHER",
}

export const REPORT_STATUS = {
    "CREATED": "CREATED",
    "BANNED": "BANNED",
    "RESOLVED": "RESOLVED"
}
