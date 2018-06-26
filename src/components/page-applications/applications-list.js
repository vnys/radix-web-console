import React from 'react';

export const ApplicationsList = ({ apps, deleteApp }) => {
  return (
    <ul>
      {apps.map(app => (
        <li key={app.metadata.name}>
          {app.metadata.name}{' '}
          {app.kind === 'RadixRegistration' && '(Not yet processed)'}
          {app.kind === 'RadixApplication' && (
            <span>
              (
              {app.buildStatus}
              {app.buildTimestamp &&
                ` @ ${new Date(app.buildTimestamp).toLocaleString()}`}
              )
            </span>
          )}
          <button onClick={() => deleteApp(app.metadata.name)}>Delete</button>
          <ul>
            {app.kind === 'RadixApplication' &&
              app.spec.environments.map(env =>
                app.spec.components.map(component => (
                  <li key={env.name + component.name}>
                    <a
                      target="_blank"
                      href={`https://${component.name}-${app.metadata.name}-${
                        env.name
                      }.dev.radix.equinor.com`}
                    >
                      {env.name}
                    </a>
                  </li>
                ))
              )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ApplicationsList;
