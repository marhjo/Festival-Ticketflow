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
  // Different available spots
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
      {/* Shows the different spots for the user to choose from */}
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
                  class={`
                    inline-flex w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent
                    p-4 before:h-4 before:w-4 before:rounded-full before:border-2 before:border-gray-500
                    before:bg-base before:content-[''] hover:bg-base peer-checked:border-peach
                    peer-checked:text-peach before:peer-checked:border-4 before:peer-checked:border-peach
                  `}
                  onClick={() => {
                    setPlace(i);
                  }}
                >
                  <p>{spot().area}</p>

                  <div class="flex-grow" />

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

      {/* Shows an image of the tent graphic */}
      {page() === 1 && (
        <>
          <div class="px-8">
            <img alt="" src="/svgs/tent.svg" />
          </div>
        </>
      )}

      {/* Shows the breakdown of the price */}
      {page() >= 2 && (
        <>
          <p class="w-full text-left text-lg font-medium">Breakdown</p>

          <div class="flex w-full flex-col items-center justify-between gap-1">
            {/* Different prices to show */}
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
              // Show a divider
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

              // Show the price
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
