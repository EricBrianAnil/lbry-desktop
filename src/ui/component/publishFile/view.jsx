// @flow
import React from 'react';
import { regexInvalidURI } from 'lbry-redux';
import classnames from 'classnames';
import FileSelector from 'component/common/file-selector';
import Button from 'component/button';

type Props = {
  name: ?string,
  filePath: ?string,
  isStillEditing: boolean,
  clearPublish: () => void,
  balance: number,
  updatePublishForm: ({}) => void,
};

function PublishFile(props: Props) {
  const { name, balance, filePath, isStillEditing, updatePublishForm, clearPublish } = props;

  function handleFileChange(filePath: string, fileName: string) {
    const publishFormParams: { filePath: string, name?: string } = { filePath };

    if (!name) {
      const parsedFileName = fileName.replace(regexInvalidURI, '');
      publishFormParams.name = parsedFileName.replace(' ', '-');
    }

    updatePublishForm(publishFormParams);
  }

  return (
    <section
      className={classnames('card card--section', {
        'card--disabled': balance === 0,
      })}
    >
      <header className="card__header">
        <h2 className="card__title card__title--flex-between">{isStillEditing ? __('Edit') : __('Publish')}</h2>
        {isStillEditing && (
          <p className="card__subtitle">
            {__('You are currently editing a claim. ')}
            <Button button="link" onClick={clearPublish} label={__('Clear')} />
          </p>
        )}
      </header>

      <div className="card__content">
        <FileSelector currentPath={filePath} onFileChosen={handleFileChange} label={'File'} />
        {!!isStillEditing && name && (
          <p className="help">
            {/* @i18nfixme */}
            {__("If you don't choose a file, the file from your existing claim")}
            {` "${name}" `}
            {__('will be used.')}
          </p>
        )}
      </div>
    </section>
  );
}

export default PublishFile;
