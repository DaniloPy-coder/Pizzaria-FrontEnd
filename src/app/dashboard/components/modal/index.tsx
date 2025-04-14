"use client";

import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { useContext } from "react";
import { OrderContext } from "@/providers/order";
import { calculateTotalOrder } from "@/lib/helper";

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = useContext(OrderContext);

  async function handleFinishOrder() {
    if (!order) return;
    await finishOrder(order.id);
  }

  if (!order) return null;

  return (
    <dialog className={styles.dialogContainer} open>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#ff3f4b" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>
            Mesa: <b>{order.table}</b>
          </span>

          <span className={styles.name}>
            <b>{order.name}</b>
          </span>

          {(order.items || []).map((item) => (
            <section className={styles.item} key={item.id}>
              <span>
                Qtd: {item.amount} - <b>{item.product.name}</b> - R${" "}
                {(parseFloat(item.product.price) * item.amount).toFixed(2)}
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <h3 className={styles.total}>
            Valor total: R$ {(calculateTotalOrder(order.items || [])).toFixed(2)}
          </h3>

          <button className={styles.buttonOrder} onClick={handleFinishOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
