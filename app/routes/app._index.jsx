import {
  Page,
  Card,
  DataTable,
  Text,
  InlineStack,
  BlockStack,
  Badge,
  Button,
  Popover,
  DatePicker,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

/* -----------------------------
   Date helpers (sample only)
-------------------------------- */
function getToday() {
  return new Date();
}

function subtractDays(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function subtractMonths(months) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
}

/* -----------------------------
   Dashboard
-------------------------------- */
export default function Dashboard() {
  const [{ month, year }, setMonthYear] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [popoverActive, setPopoverActive] = useState(false);

  const [selectedDates, setSelectedDates] = useState({
    start: subtractDays(30),
    end: getToday(),
  });

  const togglePopoverActive = useCallback(
    () => setPopoverActive((active) => !active),
    []
  );

  const handleMonthChange = useCallback((month, year) => {
    setMonthYear({ month, year });
  }, []);

  return (
    <Page
      title="Sales Analytics"
      subtitle="Filter sales data by date range"
    >
      <BlockStack gap="400">
        {/* Date Filter */}
        <InlineStack align="space-between">
          <Text as="h2" variant="headingSm">
            Overview
          </Text>

          <InlineStack gap="200">
            <Button
              size="slim"
              onClick={() =>
                setSelectedDates({
                  start: subtractDays(7),
                  end: getToday(),
                })
              }
            >
              Last 7 days
            </Button>

            <Button
              size="slim"
              onClick={() =>
                setSelectedDates({
                  start: subtractDays(30),
                  end: getToday(),
                })
              }
            >
              Last 30 days
            </Button>

            <Button
              size="slim"
              onClick={() =>
                setSelectedDates({
                  start: subtractMonths(12),
                  end: getToday(),
                })
              }
            >
              Last 12 months
            </Button>

            {/* Calendar Picker */}
            <Popover
              active={popoverActive}
              activator={
                <Button
                  size="slim"
                  variant="secondary"
                  onClick={togglePopoverActive}
                >
                  Custom range
                </Button>
              }
              onClose={togglePopoverActive}
            >
              <Popover.Pane>
                <DatePicker
                  month={month}
                  year={year}
                  onMonthChange={handleMonthChange}
                  selected={selectedDates}
                  onChange={setSelectedDates}
                  allowRange
                />
              </Popover.Pane>
            </Popover>
          </InlineStack>
        </InlineStack>

        {/* Cards */}
        <InlineStack gap="400" wrap>
          <MostSoldProducts />
          <RepeatBuyers />
          <AbandonedCarts />
        </InlineStack>
      </BlockStack>
    </Page>
  );
}

/* -----------------------------
   Sample Cards (NO real data)
-------------------------------- */
function MostSoldProducts() {
  return (
    <Card>
      <BlockStack gap="300">
        <Text as="h3" variant="headingSm">
          Most Sold Products
        </Text>

        <DataTable
          columnContentTypes={["text", "numeric"]}
          headings={["Product", "Units Sold"]}
          rows={[
            ["Basic T-Shirt", 152],
            ["Running Shoes", 97],
            ["Winter Hoodie", 81],
          ]}
        />
      </BlockStack>
    </Card>
  );
}

function RepeatBuyers() {
  return (
    <Card>
      <BlockStack gap="300">
        <Text as="h3" variant="headingSm">
          Repeat Buyers
        </Text>

        <DataTable
          columnContentTypes={["text", "numeric"]}
          headings={["Customer", "Orders"]}
          rows={[
            ["john@example.com", 6],
            ["amy@example.com", 4],
            ["guest checkout", 3],
          ]}
        />
      </BlockStack>
    </Card>
  );
}

function AbandonedCarts() {
  return (
    <Card>
      <BlockStack gap="300">
        <Text as="h3" variant="headingSm">
          Abandoned Carts
        </Text>

        <DataTable
          columnContentTypes={["text", "text", "numeric"]}
          headings={["Customer", "Status", "Value"]}
          rows={[
            ["guest", <Badge tone="attention">Abandoned</Badge>, "$120"],
            ["john@example.com", <Badge tone="attention">Abandoned</Badge>, "$89"],
          ]}
        />
      </BlockStack>
    </Card>
  );
}
