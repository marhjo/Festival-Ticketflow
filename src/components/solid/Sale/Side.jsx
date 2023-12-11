import { Card } from "../base";
import { price, tentPrice, baseFee } from "./info";

export const Side = ({ page, people, tents, realPrice }) => (
  <Card class="min-h-[130px] items-center justify-center">
    {page() === 0 && "Image here."}

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
                <div class="my-1 w-full px-1">
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
