import { format } from "date-fns";
import { ScoreItem, TeamName } from "../../lib/definitions";
import { formOptions, useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

export default function Forms({}) {
  const router = useRouter();

  const formOpts = formOptions<ScoreItem>({
    defaultValues: {
      nameOfActivity: "",
      scorePerTeam: [
        {
          team: TeamName.Blue,
          points: 0,
        },
        {
          team: TeamName.Red,
          points: 0,
        },
        {
          team: TeamName.Green,
          points: 0,
        },
        {
          team: TeamName.White,
          points: 0,
        },
        {
          team: TeamName.Orange,
          points: 0,
        },
        {
          team: TeamName.Pink,
          points: 0,
        },
        {
          team: TeamName.Purple,
          points: 0,
        },
        {
          team: TeamName.Yellow,
          points: 0,
        },
      ],
      dateOfActivity: new Date(),
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      fetch(
        `${window.location.protocol}//${window.location.host}/api/activity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        },
      ).then((val) => {
        router.push("");
      });
    },
  });

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-pretty text-3xl">Add score</h1>
      <form
        className="max-w-sm mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="space-y-6 flex flex-col">
          <form.Field name="nameOfActivity">
            {(subField) => (
              <label>
                <div>Name of Activity</div>
                <input
                  className="form-input px-4 py-3 rounded-xl"
                  value={subField.state.value}
                  onChange={(e) => subField.handleChange(e.target.value)}
                />
                {subField.state.meta.errors ? (
                  <em role="alert">{subField.state.meta.errors.join(", ")}</em>
                ) : null}
              </label>
            )}
          </form.Field>

          <form.Field name="scorePerTeam" mode="array">
            {(field) => (
              <div>
                {field.state.value.map((_, i) => (
                  <div key={i}>
                    <div className="text-gray-500">
                      {field.state.value[i].team}{" "}
                    </div>
                    <form.Field name={`scorePerTeam[${i}].points`}>
                      {(subField) => (
                        <input
                          type="number"
                          className="form-input px-4 py-3 rounded-xl"
                          value={subField.state.value}
                          onChange={(e) => {
                            subField.handleChange(e.target.valueAsNumber);
                          }}
                        />
                      )}
                    </form.Field>
                  </div>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="dateOfActivity">
            {(field) => (
              <div>
                <label>
                  <div>Datum</div>
                  <input
                    type="date"
                    className="form-input px-4 py-3 rounded-xl"
                    value={format(field.state.value, "yyyy-MM-dd")}
                    onChange={(e) =>
                      field.handleChange(e.target.valueAsDate ?? new Date())
                    }
                  />
                </label>
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="submit"
                disabled={!canSubmit}
              >
                Submit
              </button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
