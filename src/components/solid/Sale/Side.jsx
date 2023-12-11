import { createMemo } from "solid-js";
import { Card, Spinner } from "../base";
import { price, tentPrice, baseFee } from "./info";

export const Side = ({
  spots,
  place: [place, setPlace],
  page,
  people,
  tents,
  realPrice,
}) => {
  const differentSpots = createMemo(() =>
    spots().value ? spots().value.length : 0,
  );

  return (
    <Card
      as={() => (page() === 0 ? "ul" : undefined)}
      reactive={{
        class: () =>
          "min-h-[130px] items-center justify-center overflow-hidden" +
          (page() === 0 ? " p-1 gap-0" : ""),
      }}
    >
      {page() === 0 && (
        <>
          {new Array(differentSpots()).fill(null).map((_, i) => {
            const spot = () => spots().value[i];

            return (
              <li class="w-full">
                <input
                  type="radio"
                  id={spot().area}
                  name="hosting"
                  value={spot().area}
                  class="peer hidden"
                  checked={place() === i}
                />

                <label
                  for={spot().area}
                  class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-transparent p-4 hover:bg-base peer-checked:border-peach peer-checked:text-peach"
                  onClick={() => {
                    setPlace(i);
                  }}
                >
                  <p>{spot().area}</p>

                  <p>
                    {spot().available}/{spot().spots}
                  </p>
                </label>
              </li>
            );
          })}

          {spots().loading && <Spinner />}
        </>
      )}

      {page() === 1 && (
        <>
          <p class="mb-4 w-full text-left text-lg font-medium">Tents</p>

          <div class="px-8">
            <img alt="" src="/svgs/tent.svg" />
          </div>
        </>
      )}

      {page() >= 2 && (
        <>
          <p class="w-full text-left text-lg font-medium">Breakdown</p>

          <div class="flex w-full flex-col items-center justify-between gap-1">
            {[
              null,
              {
                name: "Regular",
                count: people().regular,
                price: price.regular,
              },
              { name: "VIP", count: people().vip, price: price.vip },
              {
                name: "Tent",
                count: tents().count,
                price: tentPrice[tents().type],
              },
              { name: "Booking Fee", count: 1, price: baseFee },
              null,
              { name: "Total", count: 1, price: realPrice() },
            ].map((value) => {
              if (value === null) {
                return (
                  <div class="my-3 w-full px-1">
                    <div class="h-[1px] w-full bg-peach" />
                  </div>
                );
              }

              const { name, count, price } = value;

              if (count === 0) return null;

              const x = count > 1 ? " x " + count : "";

              return (
                <div class="flex w-full items-center justify-between">
                  <div>
                    {name}
                    {x}
                  </div>

                  <div>
                    {price * count} <span class="text-subtext0">DKK</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
};
