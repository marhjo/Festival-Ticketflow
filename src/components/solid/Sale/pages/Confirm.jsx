import { createMemo } from "solid-js";
import { Card } from "../../base";
import { useTime } from "../../signals/useTime";

export const Confirm = ({ reserveInfo, reservationValid }) => {
  const time = useTime();

  const visualTime = createMemo(() => {
    const info = reserveInfo();
    const diff = info.when + info.result.timeout - time();

    if (diff < 0) return "00:00";

    const result = new Date(diff);

    const mins = result.getMinutes().toString().padStart(2, "0");
    const secs = result.getSeconds().toString().padStart(2, "0");

    return `${mins}:${secs}`;
  });

  return (
    <Card>
      <div class="flex flex-col gap-2">
        {reservationValid() && (
          <>
            <p class="mb-1 text-center text-lg font-medium">
              Confirm Registration
            </p>

            <p class="mb-2 text-center text-4xl font-semibold">
              {visualTime()}
            </p>

            <p>
              By clicking "Confirm", you confirm to have read and agreed to the
              TOS of the convention. No refunds are issued.
            </p>
          </>
        )}

        {!reservationValid() && (
          <>
            <p class="mb-1 text-center text-lg font-medium">
              Reservation Expired
            </p>

            <p class="text-red-400">
              Your reservation has expired. You will have to reserve new tickets
              to continue.
            </p>
          </>
        )}
      </div>
    </Card>
  );
};
