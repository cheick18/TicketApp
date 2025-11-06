
import ReactECharts from "echarts-for-react";
import type { Ticket } from "../../types/ticket";
import { useMemo } from "react";


export default function TicketsCharts({ tickets }: { tickets: Ticket[] }) {
  console.log("all tickets:", tickets);
  if (!tickets || tickets.length === 0) return null;

  const statusLabels: Record<string, string> = {
    open: "Ouverts",
    pending: "En cours",
    resolved: "Résolus",
    closed: "Fermés",
  };
  const ticketsByStatus = useMemo(() => {
    const counts: Record<string, number> = {};

    tickets.forEach((t) => {
      const label = statusLabels[t.status] ?? t.status;
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tickets]);

 
  const monthlyTickets = useMemo(() => {
    const months = Array(12).fill(0);

    tickets.forEach((t) => {
      const month = new Date(t.created_at).getMonth(); 
      months[month] += 1;
    });

    return months;
  }, [tickets]);

  const pieOptions = {
    title: {
      text: "Tickets par statut",
      left: "center",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        name: "Tickets",
        type: "pie",
        radius: "55%",
        data: ticketsByStatus,
      },
    ],
  };

  const barOptions = {
    title: {
      text: "Tickets créés par mois",
      left: "center",
      textStyle: { fontSize: 14 },
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: monthlyTickets,
        type: "bar",
        barWidth: "50%",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <ReactECharts option={pieOptions} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <ReactECharts option={barOptions} />
      </div>
    </div>
  );
}
