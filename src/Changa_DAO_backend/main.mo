actor Changa_DAO_backend {

  public type Milestone = {
    name: Text;
    status: Text;
  };

  public type Project = {
    id: Nat;
    name: Text;
    description: Text;
    location: Text;
    category: Text;
    categoryColor: Text;
    fundingProgress: Nat;
    raised: Nat;
    goal: Nat;
    milestones: [Milestone];
    team: Text;
    teamSize: Nat;
  };

  var projects: [Project] = [
    {
      id = 1;
      name = "Clean Water Initiative";
      description = "Building boreholes for clean water access in rural communities.";
      location = "Kisumu, Kenya";
      category = "Water";
      categoryColor = "#1E88E5";
      fundingProgress = 75;
      raised = 15000;
      goal = 20000;
      milestones = [
        {name="Site Survey"; status="completed"};
        {name="Drilling"; status="in-progress"};
        {name="Pump Installation"; status="pending"};
      ];
      team = "Water Warriors";
      teamSize = 5;
    };
    {
      id = 2;
      name = "Solar School Project";
      description = "Installing solar panels to power classrooms and labs.";
      location = "Accra, Ghana";
      category = "Energy";
      categoryColor = "#F9A825";
      fundingProgress = 40;
      raised = 8000;
      goal = 20000;
      milestones = [
        {name="Site Assessment"; status="completed"};
        {name="Panel Installation"; status="in-progress"};
        {name="System Testing"; status="pending"};
      ];
      team = "Sun Scholars";
      teamSize = 4;
    }
  ];

  public query func getProjects(): async [Project] {
    return projects;
  };
};
