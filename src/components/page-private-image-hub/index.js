import Overview from './overview';
import useGetImageHubs from './use-get-image-hubs';
import useSaveEffect from './use-save-image-hub';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import DocumentTitle from '../document-title';
import SecretForm from '../secret-form';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

export const PrivateImageHub = (props) => {
  const { appName, imageHubName } = props;

  const [getState, pollImageHubs] = useGetImageHubs(appName);
  const [saveState, saveNewSecretFunc, resetSaveState] = useSaveEffect(
    appName,
    imageHubName
  );

  const imageHub = getState.data?.find(
    (hub) => hub.server === props.imageHubName
  );

  return (
    <>
      <DocumentTitle title={`Image hub ${imageHubName}`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Configuration',
            to: routeWithParams(routes.appConfig, { appName }),
          },
          { label: 'Private image hubs' },
          { label: imageHubName },
        ]}
      />
      <AsyncResource asyncState={getState}>
        <SecretForm
          saveState={saveState.status}
          saveError={saveState.error}
          secret={imageHub}
          resetSaveState={resetSaveState}
          getSecret={pollImageHubs}
          overview={
            imageHub && (
              <Overview server={imageHubName} username={imageHub.username} />
            )
          }
          handleSubmit={saveNewSecretFunc}
        />
      </AsyncResource>
    </>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'imageHubName'],
  PrivateImageHub
);
