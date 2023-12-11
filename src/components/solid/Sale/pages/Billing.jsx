import { Input, Card } from "../../base";
import Cleave from "cleave.js";

export const Billing = ({
  creditCard: [creditCard, setCreditCard],
  expiration: [expiration, setExpiration],
  cvv: [cvv, setCvv],
}) => {
  if (typeof document !== "undefined") {
    setTimeout(() => {
      new Cleave("#__credit_card", {
        creditCard: true,
      });

      new Cleave("#__expiration", {
        date: true,
        datePattern: ["m", "y"],
      });

      new Cleave("#__cvv", {
        numeral: true,
        maxLength: 3,
      });
    });
  }

  return (
    <Card class="gap-2">
      <div class="flex items-center justify-between gap-3">
        <p class="text-lg font-medium">Payment Details</p>
      </div>

      <div class="w-full">
        <p class="mb-1 text-sm font-medium">Credit Card</p>

        <Input
          id="__credit_card"
          class="w-full"
          placeholder="0000..."
          value={creditCard()}
          onInput={(e) => setCreditCard(e.target.value)}
          type="text"
        />
      </div>

      <div className="flex gap-2">
        <div class="w-full">
          <p class="mb-1 text-sm font-medium">Expiration</p>

          <Input
            id="__expiration"
            placeholder="01/23"
            value={expiration()}
            onInput={(e) => setExpiration(e.target.value)}
            type="text"
            class="w-full"
          />
        </div>

        <div class="w-full">
          <p class="mb-1 text-sm font-medium">CVV</p>

          <Input
            id="__cvv"
            placeholder="123"
            value={cvv()}
            onInput={(e) => setCvv(e.target.value)}
            type="text"
            class="w-full"
            maxlength="3"
          />
        </div>
      </div>
    </Card>
  );
};
