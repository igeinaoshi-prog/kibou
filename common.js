// 従業員用・管理者用ページの両方で使う共通処理

import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { doc, getDoc, setDoc, deleteDoc, onSnapshot, collection, query, where, getDocs };

export const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function monthKey(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}

export function monthLabelText(d) {
  return d.getFullYear() + "年 " + (d.getMonth() + 1) + "月";
}

export function daysInMonthOf(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}
