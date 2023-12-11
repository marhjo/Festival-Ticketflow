import { Card } from "../../base";

export const Done = ({ reserveInfo }) => (
  <Card class="gap-2">
    <p class="w-full text-left text-lg font-medium">Thank You!</p>

    <p>
      Your order has been received and will be processed once payment has been
      confirmed.
    </p>

    <p>
      <span class="font-medium">Order ID:</span> {reserveInfo().result.id}
    </p>
  </Card>
);
