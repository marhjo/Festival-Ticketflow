import { Card } from "../../base";
import { useTime } from "../../signals/useTime";

export const Confirm = ({ reserveInfo }) => {
  const time = useTime();

  const visualTime = () => {
    const info = reserveInfo();
    const diff = info.when + info.result.timeout - time();

    if (diff < 0) return "00:00";

    const result = new Date(diff);

    const mins = result.getMinutes().toString().padStart(2, "0");
    const secs = result.getSeconds().toString().padStart(2, "0");

    return `${mins}:${secs}`;
  };

  return (
    <Card>
      <div class="flex flex-col gap-2">
        <p class="mb-1 text-center text-lg font-medium">Confirm Registration</p>

        <p class="mb-2 text-center text-4xl font-semibold">{visualTime()}</p>

        <p>
          By clicking "Confirm", you confirm to have read and agreed to the TOS
          of the convention. No refunds are issued.
        </p>
      </div>
    </Card>
  );
};
